const { ShardingManager } = require("discord.js");
const config = require("./config")
const shard = new ShardingManager(`./main.js`, {
    token: config.token
})

shard.spawn(config.shards)
shard.on("shardCreate", shard => console.log(`[Sharding]: Shard o ID: ${shard.id+1} został uruchomiony!`))