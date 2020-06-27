import Puzzle from "../puzzle";

var arr = [];
function createNum() {
  const min = Math.ceil(1);
  const max = Math.floor(9);
  var num = Math.floor(Math.random() * (max - min)) + min;
  while (arr[num] === 2) {
    num = Math.floor(Math.random() * (max - min)) + min;
  }
  if (arr[num] === undefined) arr[num] = 1;
  else if (arr[num] === 1) arr[num] = 2;
  return num;
}
module.exports = function (app) {
  // >> index.pug
  app.get("/", function (req, res) {
    Puzzle.find(function (error, puzzle) {
      console.log("--- Read all ---");
      if (error) {
        console.log(error);
      } else {
        console.log(puzzle);
      }
    });
    //res.send("200");
    res.render("index");
  });

  app.get("/:id", function (req, res) {
    var id = req.params.id;
    if (id == "start") {
      console.log("start");
      Puzzle.find(function (error, puzzle) {
        console.log("--- Read all ---");
        if (error) {
          console.log(error);
        } else {
          res.send(puzzle);
        }
      });
    } else {
      id = parseInt(id);
      Puzzle.findOne({ id: id }, function (error, puzzle) {
        console.log("--- Read all ---");
        if (error) {
          console.log(error);
        } else {
          res.send(puzzle);
        }
      });
    }
  });

  // >> POST
  app.post("/", function (req, res) {
    // var result = returnResult(err, res);
    for (let i = 1; i <= 16; i++) {
      let num = createNum();
      console.log(num);
      var newPuzzle = new Puzzle({
        id: i,
        value: num,
        flip: false,
      });
      newPuzzle.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log("Saved!");
        }
      });
    }
    res.send(newPuzzle);
  });

  // >> GET
  /*


  // >> GET/id
  app.get("/games/:id", function (req, res) {
    var result = {};
    // SQL injection attack 방지위해 mysql.escape();
    var id = mysql.escape(req.params.id);
    console.log(id);
    // db에 연결하여 sql 수행
    pool.getConnection(function (err, conn) {
      var sql = "SELECT * from myGames WHERE id=" + id + ";";
      conn.query(sql, function (err, rows) {
        var result = returnResult(err, res);
        if (rows) {
          console.log(rows);
          result.message = rows;
        }
        conn.release();
        result.status = res.statusCode;
        res.send(result);
      });
    });
  });
  */
  app.put("/:id", function (req, res) {
    var id = parseInt(req.params.id);
    Puzzle.findOneAndUpdate({ id: id }, { flip: true }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("1111");
        res.send(result);
      }
    });
  });

  app.delete("/", function (req, res) {
    for (let i = 1; i <= 16; i++) {
      Puzzle.remove({ id: i }, function (error, output) {
        if (error) {
          console.log(error);
        }
        console.log("--- deleted ---");
      });
    }
    res.send("200");
  });
};
var returnResult = function (err, res) {
  // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
  var result = {};
  if (err) {
    res.status(400);
    result.message = err.stack;
  } else {
    res.status(200);
    result.message = "Success";
  }
  return result;
};
