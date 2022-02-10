const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/sendMessage", (req, res, next) => {
  const { who, whom, content } = req.body;

  console.log(who);
  console.log(whom);
  console.log(content);

  const insertQuery = `
    INSERT INTO message (
		who,
		whom,
		content,
		createdAt
    ) VALUE (
		${who},
        ${whom},
        "${content}",
        now()
    
    )
    `;

  try {
    db.query(insertQuery, (err, rows) => {
      if (err) {
        throw "데이터베이스 접근 실패";
      }

      return res.status(201).send("성공");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("메세지 전송에 실패하셨습니다");
  }
});

router.post("/getMessage", (req, res, next) => {
  const { myId } = req.body;

  const selectQuery = `
            SELECT  A.id,
                    A.who,
                    B.nickname		AS whoName,
                    A.whom,
                    C.nickname		AS whomName,
                    A.content,
                    A.isRead,
                    A.createdAt
              FROM  message  A
             INNER
              JOIN	user	B
                ON	A.who = B.id
             INNER
              JOIN	user	C
                ON	A.whom = C.id
             WHERE	A.who = ${myId}
                OR  A.whom = ${myId}
            ORDER	BY	createdAt	DESC
    `;
  try {
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(err);
        throw "쿼리 실핼 실패";
      }

      return res.status(200).json(rows);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("메세지 조회 실패하셨습ㄴ다");
  }
});

module.exports = router;
