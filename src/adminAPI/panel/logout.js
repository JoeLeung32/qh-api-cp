import { container } from "#utils/util.js";
import {knex} from "#utils/database/index.js";

export const PanelLogout = container(async (req, res) => {
  const authToken = req.headers?.authorization?.substring(7).trim();

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
