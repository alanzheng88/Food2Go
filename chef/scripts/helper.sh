function restartBackendServer {
    echo "Restarting server"
    sudo devscripts/clearTables.sh
    sudo kill -9 $(sudo lsof -t -i:9000)
    pushd api/
    screen -d -m /home/downloads/play-1.4.3/play run --%dev
    popd
    sleep 5
    echo "Warm up backend server"
    curl -X GET -m 60 http://localhost:9000
}

function restartFrontendServer {
    sudo kill -9 $(sudo lsof -t -i:12345)
    pushd frontend/
    npm install
    screen -d -m /usr/bin/npm run dev
    popd
}
