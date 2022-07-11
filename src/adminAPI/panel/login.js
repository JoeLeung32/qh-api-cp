import {nanoid} from "nanoid";

import {container} from "#utils/util.js";
import {knex} from "#utils/database/index.js";
import {passwordCompare} from "#utils/bcrypt.js";

export const PanelLogin = container(async (req, res) => {
    let rejectReason = {
        noBody: {
            status: 400,
            message: "Access Denied",
        },
        noAccount: {
            status: 401,
            message: "Incorrect account",
        },
        invalidLogin: {
            status: 401,
            message: "Incorrect username or password",
        }
    };
    if (!req || !req.body) {
        res.status(rejectReason.noBody.status)
            .send(rejectReason.noBody.message);
        return;
    }

    // Get Params from Body
    const username = req.body?.username;
    const password = req.body?.password;
    if (!username || !password) {
        res.sendStatus(400);
        return;
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
        res.status(rejectReason.noAccount.status)
            .send(rejectReason.noAccount.message);
        return;
    }
    account = accounts[0];


    // Avoid Old Token
    const isValidLogin = await passwordCompare(
        password,
        account.password
    );
    if (!isValidLogin) {
        res.status(rejectReason.invalidLogin.status)
            .send(rejectReason.invalidLogin.message);
        return;
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
    const source  = new Date();
    const now = source.toISOString();
    let expiry = new Date();
    expiry.setTime(source.getTime() + 60 * 60 * 1000);
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
