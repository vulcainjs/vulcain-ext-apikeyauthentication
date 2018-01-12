import { Command, AbstractServiceCommand, UserToken, Model, Property } from "vulcain-corejs";

@Model()
export class VerifyTokenParameter {
    @Property({ type: "string", required: true })
    token: string;
    @Property({ type: "string" })
    tenant: string;
}

@Command({ executionTimeoutInMilliseconds: 500 })
export class ApiKeyVerifyCommand extends AbstractServiceCommand {
    static commandName = "ApiKeyVerifyCommand";

    async run(apiKeyServiceName: string, apiKeyServiceVersion: string, data: VerifyTokenParameter): Promise<UserToken> {
        let resp = await this.sendAction<boolean>(apiKeyServiceName, apiKeyServiceVersion, "apikey.verifyToken", data);
        return resp && resp.value;
    }
}