# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

execute 'apt_get_npm' do
  command 'apt-get install -y npm'
end

execute 'link_nodejs_to_node_binary' do
  command 'ln -sf /usr/bin/nodejs /usr/bin/node'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

# Play 2 setup
package "unzip"
directory "/home/downloads" do
  action :create
end
cookbook_file "play-1.4.3.zip" do
  path "/home/downloads/play-1.4.3.zip"
end
execute "play1-unzip" do
  cwd "/home/downloads"
  command "unzip play-1.4.3.zip"
  not_if { ::File.directory?("/home/downloads/play-1.4.3") }
end

# Frontend webserver setup
package "nginx"
cookbook_file "nginx-default" do
  path "/etc/nginx/sites-available/default"
end
execute "nginx_reload" do
  command "nginx -s reload"
end

# Database setup
package "postgresql"
execute "postgresql_setup" do
  command 'echo "CREATE DATABASE foodexpress; CREATE USER ubuntu WITH PASSWORD \'password\'; GRANT ALL PRIVILEGES ON DATABASE foodexpress TO ubuntu; " | sudo -u postgres psql'
end

ruby_block "set_play_path" do
  block do
    file = Chef::Util::FileEdit.new('/home/ubuntu/.profile')
    match = "play-1.4.3"
    line = 'PATH="/home/downloads/#{match}:$PATH"'
    file.insert_line_if_no_match(match, line)
    file.write_file
  end
end

ruby_block "set_default_login_dir" do
  block do
    file = Chef::Util::FileEdit.new('/home/ubuntu/.bashrc')
    match = "/home/ubuntu/project"
    line = "cd #{match}"
    file.insert_line_if_no_match(match, line)
    file.write_file
  end
end
