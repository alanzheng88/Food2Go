# -*- mode: ruby -*-
# vi: set ft=ruby :


$rootScript = <<SCRIPT

  # Install Java
  if ! command -v java >/dev/null 2>&1; then
    apt-get install -y software-properties-common python-software-properties
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
    add-apt-repository ppa:webupd8team/java -y
    apt-get update
    apt-get install oracle-java8-installer
    echo "Setting environment variables for Java 8.."
    apt-get install -y oracle-java8-set-default --allow-unauthenticated
  fi

SCRIPT


VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_version = '>= 20160921.0.0'

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:11000" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 11000
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.network "forwarded_port", guest: 10000, host: 10000

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  
  config.vm.synced_folder "./", "/home/ubuntu/project"
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # If you need to more than double the defaults for this course, you have
  # done something wrong.
  cpus = "1"
  memory = "1024" # MB
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--cpus", cpus, "--memory", memory]
    vb.customize ["modifyvm", :id, "--uartmode1", "disconnected"] # speed up boot https://bugs.launchpad.net/cloud-images/+bug/1627844
    #vb.gui = true
  end
  config.vm.provider "vmware_fusion" do |v, override|
    v.vmx["memsize"] = memory
    v.vmx["numvcpus"] = cpus
  end
  config.vm.provider :cloudstack do |cloudstack, override|
    override.vm.box = "Ubuntu-16.04-keys"
    cloudstack.scheme = "http"
    cloudstack.host = "sfucloud.ca"
    cloudstack.path = "/client/api"
    cloudstack.port = "8080"
    cloudstack.api_key = ENV['CLOUDSTACK_KEY'] || "AAAAAAAAAAAAAAAA"
    cloudstack.secret_key = ENV['CLOUDSTACK_SECRET'] || "AAAAAAAAAAAAAAAA"
    cloudstack.service_offering_name = "sc.t2.micro"
    cloudstack.zone_name = "NML-Zone"
    cloudstack.name = "cmpt470-#{File.basename(Dir.getwd)}-#{Random.new.rand(100)}"
    cloudstack.ssh_user = "ubuntu"
    cloudstack.security_group_names = ['CMPT 470 firewall']
  end

  config.vm.provision "shell", inline: $rootScript

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  config.vm.provision "chef_solo" do |chef|
    chef.cookbooks_path = "chef/cookbooks"
    chef.add_recipe "baseconfig"
  end

  config.vm.provision "shell", inline: $rootScript
  config.vm.provision "shell", inline: "cd project/frontend/;npm install;screen -d -m npm run dev", run: "always", privileged: false
  config.vm.provision "shell", inline: "cd project/api/;screen -d -m play run", run: "always", privileged: false
end
