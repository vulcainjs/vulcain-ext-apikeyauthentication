import { Command, AbstractServiceCommand, UserToken, Model, Property } from "vulcain-corejs";

@Model()
export class VerifyTokenParameter {

}

@Command({ executionTimeoutInMilliseconds: 500 })
export class ApiKeyVerifyCommand extends AbstractServiceCommand {
    static commandName = "ApiKeyVerifyCommand";

    async runAsync(apiKeyServiceName: string, apiKeyServiceVersion: string, data: VerifyTokenParameter): Promise<UserToken> {
        let resp = await this.sendActionAsync<boolean>(apiKeyServiceName, apiKeyServiceVersion, "apikey.verifyToken", data);
        return resp.value;
    }
}