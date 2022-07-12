import {nanoid} from "nanoid";
import {container} from "#utils/util.js";
import {StatusCodes} from "#utils/error/errorMessage.js";
import {knex} from "#utils/database/index.js";
import {passwordCompare} from "#utils/bcrypt.js";

export const PanelLogin = container(async (req, res) => {
    // Get Params from Body
    const username = req.body?.username;
    const password = req.body?.password;
    if (!username || !password) {
        throw StatusCodes.C400
    }

    // Account Validation
    let account = null;
    const accounts = await knex('ap-admin')
        .select('id', 'username', 'password')
        .where({
            username: username
        })
        .limit(1)
    if (!accounts || accounts.length !== 1) {
        throw StatusCodes.C401
    }
    account = accounts[0];


    // Avoid Old Token
    const isValidLogin = await passwordCompare(
        password,
        account.password
    );
    if (!isValidLogin) {
        throw StatusCodes.C403
    }
    await knex('ap-admin-token')
        .where({
            adminId: account.id
        })
        .update({
            isValid: false
        })

    // Assign New Token
    const authToken = nanoid(256);
    const now = new Date().toISOString();
    let expiry = new Date();
    expiry.setTime(expiry.getTime() + parseInt(process.env.SESSION_TOKEN_LIFE));
    expiry = expiry.toISOString();

    await knex('ap-admin-token')
        .insert({
            adminId: account.id,
            token: authToken,
            created_at: now,
            expiryAt: expiry,
            isValid: true,
        })

    // Export
    res.status(200).json({
        id: account.id,
        token: authToken,
        effective: now,
        expiry: expiry
    })
})
