module.exports = {
    name: "message",
    run: async (client, msg) => {

        if (msg.guild.id !== "778386889417687050") return;

        const jd = ["dodaj", "dodaj", "nie", "nie", "nie", "nie", "nie", "tak", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie", "nie"];
        
        let emotka = '828191385513099305'
        let em = jd[Math.floor(Math.random() * jd.length)+1]

        if (em === "dodaj") {
            msg.react(emotka);
        }

        if (em === "tak") {
            emotka = '828034894390231060'
            msg.react(emotka);
        }

    }
}