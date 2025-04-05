import jwt from 'jsonwebtoken';
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw1b/PruDGUEm33jDouwl
m0yh0ZTyyFobhQPoNFr3EkRj3OG4bGwqntTCyv/i8v89XGHp5+Ft0lYJOzamHQmU
ZthswAOqiHu6Hy4fxMoWmDEo57Pn/AGmC4aB9RD+3F4ooPUYsRjRy7TpVCUmECGm
bE+rO6GI5W3pcLEmM3unOnTXrv8f0hu34R9Jj6vXjgPgBLk05+H2DPmLKpIE3hrp
dp9b5IZ46UQyg1BKnhE4VL+g4RhP7eDa7BUEKre86wHF4DPv+b3KxGsxr8MYCZWX
dLgs6aNXT7JLDEBacmQPJ/ouStJUl3yAYPlmJFI/HJqDL+bUkblRhQciDscOUb3b
kQIDAQAB
-----END PUBLIC KEY-----
`;
export const handler = async (event) => {
    const authHeader = event.authorizationToken;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return buildDeny("anonymous", event.methodArn);
    }
    const token = authHeader.substring(7).trim();
    console.log(event);
    try {
        // Für RS256 mit Public Key validieren
        const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
        // Beispiel: Falls wir "sub" (subject) aus dem Token als principal verwenden
        if (decoded.iss !== "custom-issuer") {
            console.log("wrong-issuer");
            throw "wrong-issuer";
        }
        if (decoded.role !== "user") {
            console.log("wrong-permission");
            throw "wrong-permission";
        }
        if (decoded && decoded.sub) {
            const principal = buildAllow(decoded.sub, event.methodArn);
            console.log(principal);
            return principal;
        }
        else {
            const principal = buildDeny("invalid-claims", event.methodArn);
            console.log(principal);
            return principal;
        }
    }
    catch (error) {
        // Token ungültig oder abgelaufen
        console.error("Fehler bei der Token-Verifizierung:", error);
        const principal = buildDeny("invalid-token", event.methodArn);
        console.log(principal);
        return principal;
    }
};
function buildAllow(principalId, resource) {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: resource,
                },
            ],
        },
    };
}
function buildDeny(principalId, resource) {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Deny",
                    Resource: resource,
                },
            ],
        },
    };
}
//# sourceMappingURL=authorizeCode.js.map