import {authedContainer} from "#utils/container.js";
import {knex} from "#utils/database/index.js";

export const PanelLogout = authedContainer(async (req, res, error, authToken) => {
    // Avoid Token
    const status = await knex('ap-admin-token')
        .where({
            token: authToken,
        })
        .update({
            isValid: false,
        })

    if (!status) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
})
