import { GenericContainer, Wait } from "testcontainers";
import { copyToDirAs } from "./helpers";
import os from 'node:os';
import fs from 'node:fs';
import path from "node:path";

export const createAppContainer = async ({
    dbFile
}: {
    dbFile: string;
}) => {
    const tempDir = os.tmpdir();
    const tempDiDb = path.join(tempDir, 'db');
    const filesTempDir = path.join(tempDir, 'files');

    copyToDirAs(tempDiDb, dbFile, 'vikunja.db');


    const container = await new GenericContainer('vikunja/vikunja')
        .withName('vikunja_test')
        .withEnvironment({
            VIKUNJA_SERVICE_JWTSECRET: 'secret',
            VIKUNJA_SERVICE_PUBLICURL: 'http://localhost:3456/',
            VIKUNJA_DATABASE_PATH: '/db/vikunja.db',
        })
        .withExposedPorts({ container: 3456, host: 3456 })
        .withCopyDirectoriesToContainer([
            {
                source: tempDiDb, target: '/db', mode: 0o777,
            },
            {
                source: filesTempDir, target: '/app/vikunja/files', mode: 0o777,
            },
        ])
        .withWaitStrategy(Wait.forLogMessage(/http server started/g, 1))
        .start().catch(error => {
            console.error('Error starting container', error);
            throw error;
        })


    return async () => {
        await container.stop();
        fs.rmSync(tempDir, { recursive: true });
    }
}