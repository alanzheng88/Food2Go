projectDir = "/home/ubuntu/project"
serversideTestDir = "#{projectDir}/api"
serversideTestResultsDir = "#{serversideTestDir}/test-result"
clientsideTestDir = "#{projectDir}/frontend/test"
playScript = "/home/downloads/play-1.4.3/play"

# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute "apt_update" do
  command "apt-get update"
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute "ntp_restart" do
  command "service ntp restart"
end

execute "java_install" do
  cwd "#{projectDir}"
  command "bash chef/scripts/javainstall.sh"
end

execute 'apt_get_npm' do
  command 'apt-get install -y npm'
end

execute 'link_nodejs_to_node_binary' do
  command 'ln -sf /usr/bin/nodejs /usr/bin/node'
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
  command 'echo "CREATE DATABASE food2go; CREATE USER ubuntu WITH PASSWORD \'password\'; GRANT ALL PRIVILEGES ON DATABASE food2go TO ubuntu; " | sudo -u postgres psql'
end

ruby_block "set_play_path" do
  block do
    file = Chef::Util::FileEdit.new('/home/ubuntu/.profile')
    line = 'PATH="/home/downloads/play-1.4.3:$PATH"'
    file.insert_line_if_no_match("play-1.4.3", line)
    file.write_file
  end
end

ruby_block "set_default_login_dir" do
  block do
    file = Chef::Util::FileEdit.new('/home/ubuntu/.bashrc')
    line = "cd #{projectDir}"
    file.insert_line_if_no_match("#{projectDir}", line)
    file.write_file
  end
end

#execute "run_serverside_tests" do
#  cwd "#{serversideTestDir}"
#  command "#{playScript} auto-test"
#  notifies :create, "ruby_block[check_serverside_tests_results]", :immediately
#end

#ruby_block "check_serverside_tests_results" do
#  block do
#    raise "Server side tests failed. Check tests results."
#  end
#  not_if { ::File.file?("#{serversideTestResultsDir}/result.passed") }
#end

execute "server_start" do
  user "ubuntu"
  cwd "#{projectDir}"
  command "sudo bash chef/scripts/manage.sh"
end

execute "jasmine-node_install" do
  user "ubuntu"
  command "sudo /usr/bin/npm install -g jasmine-node"
end

execute "run_api_tests" do
  user "ubuntu"
  cwd "#{clientsideTestDir}"
  command "/usr/local/bin/jasmine-node . --junitreport"
end

execute "server_restart" do
  user "ubuntu"
  cwd "#{projectDir}"
  command "sudo bash chef/scripts/restartserver.sh"
end
