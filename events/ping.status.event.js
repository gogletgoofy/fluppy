module.exports = {
    name: "ready",
    run: async (client) => {

        setInterval(() => {

            if (client.ws.ping < 150) {
                client.user.setStatus('ONLINE');
            }

            if (client.ws.ping > 150 && client.ws.ping < 300) {
                client.user.setStatus('IDLE');
            }

            if (client.ws.ping > 300) {
                client.user.setStatus('DND');
            }

        }, 5 * 1000);
    }
}