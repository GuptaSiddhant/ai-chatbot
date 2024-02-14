filename="db.json"

if ! test -f ${filename}; then
    touch ${filename}
    echo "{ \"users\": [], \"chats\": [], \"conversations\": [] }" >${filename}
fi

npx json-server ${filename} --port 4000
