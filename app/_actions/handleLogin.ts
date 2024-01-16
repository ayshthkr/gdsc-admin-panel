"use server"

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export default async function handleLogin(prevData: any, formdata: FormData) {
    await timeout(3000);
    return {
        message: "Done"
    }
}