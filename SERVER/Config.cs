using IdentityServer4;
using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4.Test;


namespace IdentityServerWithAspNetIdentity
{
    public class Config
    {
        // scopes define the resources in your system
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource {
                    Name = "role",
                    DisplayName="Your role names",
                    Description="Your role names and role codes",
                    UserClaims = { "role", "admin", "user"},
                    ShowInDiscoveryDocument=true
                }
            };
        }


        // authorized applications, protedted resources
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
            new ApiResource("api2", "API 2", new List<string> { "name", "role", "email" }),
            new ApiResource("api1", "API 1")
        };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                  // Angular client core service
                new Client
                {
                    ClientId = "angular",
                    ClientName = "angular",
                    AccessTokenLifetime = 60*60,// 60 minutes
                    AllowedGrantTypes =  GrantTypes.Implicit,
                   //AlwaysSendClientClaims=true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    ClientSecrets ={new Secret("*****".Sha256())},
                    RequireConsent = true,
                    AllowAccessTokensViaBrowser = true,
                    AllowOfflineAccess = true,
                    AccessTokenType = AccessTokenType.Jwt,
                    AllowedScopes = { "openid", "profile", "email", "role","api1" ,"api2"},
                    RedirectUris = { "http://localhost:4200", "http://localhost:4201" },
                    PostLogoutRedirectUris = { "http://localhost:4200", "http://localhost:4201" },
                    FrontChannelLogoutUri =  "http://localhost:4200",
                    AllowedCorsOrigins = new List<string>{
                    "http://localhost:4201",
                    "http://localhost:4200", // web
                    "http://127.0.0.1:5001",
                    "http://127.0.0.1:5002",// api
                    "http://localhost:5001",
                    "http://localhost:5002",
                    }
                }

            };
        }


        //public static List<TestUser> GetUsers()
        //{
        //    return new List<TestUser>
        //    {
        //        new TestUser
        //        {
        //            SubjectId = "1",
        //            Username = "systemuser",
        //            Password = "123",
        //            Claims = {
        //                new Claim(JwtClaimTypes.Name,"Systemuser"),
        //                new Claim(JwtClaimTypes.Role,"system"),
        //                new Claim(JwtClaimTypes.Email, "systemuser@mycompany.com")
        //            }
        //        }
        //    };
        //}
    }
}