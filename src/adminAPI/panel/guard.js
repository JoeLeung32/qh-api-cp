import {container} from "#utils/util.js";
import {knex} from "#utils/database/index.js";

export const PanelGuard = container(async (req, res) => {
  const authToken = req.headers?.authorization?.substring(7).trim();
  let rejectReason = {
    invalidToken: {
      status: 401,
      message: "Invalid token",
    },
  };

  if (!authToken) {
    res.status(rejectReason.invalidToken.status)
        .json({
            message: rejectReason.invalidToken.message
        });
    return;
  }

  // Token Valid
  const tokens = await knex('ap-admin-token')
      .select('token', 'expiryAt')
      .where({
        token: authToken,
        isValid: true
      })
  if (!tokens || tokens.length !== 1) {
    res.status(rejectReason.invalidToken.status)
        .json({
            message: rejectReason.invalidToken.message
        });
    return;
  }

  // Token Refresh
  const source = new Date();
  const now = source.toISOString();
  let expiry = new Date();
  expiry.setTime(source.getTime() + 60 * 60 * 1000);
  expiry = expiry.toISOString();
  await knex('ap-admin-token')
      .where({
        token: authToken,
        isValid: true
      })
      .update({
        updated_at: now,
        expiryAt: expiry
      })

  res.sendStatus(200)
})
