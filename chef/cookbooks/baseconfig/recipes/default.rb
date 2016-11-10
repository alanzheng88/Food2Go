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
cookbook_file "play-1.4.3.zip" do
  path "/home/downloads/play-1.4.3.zip"
end
execute "play1-unzip" do
  cwd "/home/downloads"
  command "unzip play-1.4.3.zip"
  not_if { ::File.directory?("/home/downloads/play-1.4.3") }
end

# environment paths
cookbook_file ".profile" do
  path "/home/ubuntu/.profile"
end
cookbook_file ".bashrc" do
  path "/home/ubuntu/.bashrc"
end
