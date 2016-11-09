# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
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
cookbook_file "activator-dist-1.3.12.zip" do
  path "/home/downloads/activator-dist-1.3.12.zip"
end
execute "play2-unzip" do
  cwd "/home/downloads"
  command "unzip activator-dist-1.3.12.zip"
  not_if { ::File.directory?("/home/downloads/activator-dist-1.3.12") }
end
execute "chown-activator" do
  command "chown -R ubuntu:ubuntu /home/downloads/activator-dist-1.3.12"
  user "root"
end

# environment paths
cookbook_file ".profile" do
  path "/home/ubuntu/.profile"
end
cookbook_file ".bashrc" do
  path "/home/ubuntu/.bashrc"
end
