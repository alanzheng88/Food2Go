# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

execute 'apt_get npm' do
  command 'apt-get install -y npm'
end

execute 'npm install webpack' do
  command 'npm install -g webpack'
end

execute 'npm install webpack-dev-server' do
  command 'npm install -g webpack-dev-server'
end
execute 'link nodejs to node binary' do
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
