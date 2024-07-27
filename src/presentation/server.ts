import express from "express";
import path from "path";



interface ServerConfig {
    port: number;
    publicPath: string;

}


export class Server {
    private app = express();
    private readonly port: number;
    private readonly publiPath: string;



    constructor(options: ServerConfig) {
        const { port, publicPath } = options;

        this.port = port;
        this.publiPath = publicPath;
    }

    async start() {
        this.app.use(express.static(this.publiPath));

        this.app.get("*", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publiPath}/index.html`);
            res.sendFile(indexPath);
        })



        this.app.listen(this.port, () => {
            console.log(`Server started on Port ${this.port}`);
        })
    }
}