import { IAuthenticationStrategy, UnauthorizedRequestError, IAuthorizationPolicy, ConfigurationProperty, IDynamicProperty, Inject, DefaultServiceNames, System, IRequestContext, Injectable, LifeTime, DynamicConfiguration, UserToken } from "vulcain-corejs";
import { ApiKeyVerifyCommand } from "./command";

@Injectable(LifeTime.Singleton, DefaultServiceNames.AuthenticationStrategy )
export class ApiKeyAuthentication implements IAuthenticationStrategy {

    public readonly name = "apiKey";
    private enabled: boolean;

    @ConfigurationProperty("apiKeyServiceName", "string")
    private apiKeyServiceName: IDynamicProperty<string>;
    @ConfigurationProperty("apiKeyServiceVersion", "string")
    private apiKeyServiceVersion: IDynamicProperty<string>;

    constructor() {
        this.apiKeyServiceName = DynamicConfiguration.getChainedConfigurationProperty<string>("apiKeyServiceName");
        this.apiKeyServiceVersion = DynamicConfiguration.getChainedConfigurationProperty<string>("apiKeyServiceVersion");     
        this.enabled = !!this.apiKeyServiceName.value && !!this.apiKeyServiceVersion.value;
        if(this.enabled)
            System.log.info(null, () => `using ${this.apiKeyServiceName.value}-${this.apiKeyServiceVersion.value} as ApiKey server`);
    }

    async verifyTokenAsync(ctx: IRequestContext, accessToken: string, tenant: string): Promise<UserToken> {
        if (!this.enabled)
            return null;
        
        if (!accessToken) {
            throw new UnauthorizedRequestError("You must provide a valid token");
        }

        let cmd = ctx.getCommand<ApiKeyVerifyCommand>(ApiKeyVerifyCommand.name);
        let userContext = await cmd.runAsync(this.apiKeyServiceName.value, this.apiKeyServiceVersion.value, { token: accessToken, tenant });
        if (!userContext)
            throw new UnauthorizedRequestError("Invalid api key");
        return userContext;
    }
}