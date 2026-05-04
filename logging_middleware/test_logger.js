import Log from "./logger.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJraHVzaGkuMjYwODRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsImV4cCI6MTc3Nzg3NDUzNywiaWF0IjoxNzc3ODczNjM3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTgxMDllOTMtNTc3NS00OGMyLWFiNTYtMzM0NTJjNmNlMTRlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2h1c2hpIGFnZ2Fyd2FsIiwic3ViIjoiZTA5N2IxM2MtNzJmMC00ZGE4LWJmYTUtZjU2MDBhN2FjZmFmIn0sImVtYWlsIjoia2h1c2hpLjI2MDg0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJuYW1lIjoia2h1c2hpIGFnZ2Fyd2FsIiwicm9sbE5vIjoiMjYwODQiLCJhY2Nlc3NDb2RlIjoidWtzZFdUIiwiY2xpZW50SUQiOiJlMDk3YjEzYy03MmYwLTRkYTgtYmZhNS1mNTYwMGE3YWNmYWYiLCJjbGllbnRTZWNyZXQiOiJZYVhWSHFyR2NOYXdCZVJFIn0.5mgNWwg2oppx_qUWY7m_Dh_Juprs4JrinWcutPXhskA";

async function test() {
    const result = await Log(
        "backend",
        "info",
        "utils",
        "Logger test successful",
        TOKEN
    );

    console.log(result);
}

test();