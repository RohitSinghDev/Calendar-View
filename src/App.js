import Calendar from "./components/calendar/index";
import "./App.css";
const App = () => {
  const style = {
    position: "relative",
    margin: "50px auto",
  };
  let data = [
    { date: "03-01-2020", income: 10000 },
    { date: "03-01-2020", expense: 5000 },
    { date: "03-02-2020", expense: 2000 },
    { date: "03-03-2020", income: 1000 },
    { date: "20-09-2002", income: 200 },
    { date: "20-09-2002", expense: 100 },
    { date: "20-10-2002", income: 400 },
    { date: "20-10-2002", expense: 400 },
    { date: "03-03-2019", income: 1001 },
    { date: "10-09-2022", income: 10000 },
    { date: "10-09-2022", expense: 30000 },
  ];

  let dataMain = {
    2020: {
      "01": {
        "07": {
          income: 4000,
          expense: 2000,
        },
      },
    },
  };

  const set = (obj, path, val) => {
    let keys = path.split("-");
    keys = keys.reverse();
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
    lastObj[lastKey] = val;
  };

  const checkPath = (keys2) => {
    let flag = false;
    if (dataMain[keys2[0]]) {
      if (dataMain[keys2[0]][keys2[1]]) {
        if (dataMain[keys2[0]][keys2[1]][keys2[2]]) {
          flag = true;
        }
      }
    }
    return flag;
  };

  for (let d1 = 0; d1 < data.length; d1++) {
    let keys2 = data[d1].date.split("-");
    keys2 = keys2.reverse();
    if (!checkPath(keys2)) {
      set(dataMain, data[d1].date, {});
    }

    if (data[d1].income) {
      dataMain[keys2[0]][keys2[1]][keys2[2]]["income"] = data[d1].income;
      // console.log(keys2, dataMain);
    }
    if (data[d1].expense) {
      dataMain[keys2[0]][keys2[1]][keys2[2]]["expense"] = data[d1].expense;
      // console.log(keys2, dataMain);
    }
  }

  return (
    <>
      <div className="App">
        <Calendar style={style} width="300px" dataMain={dataMain} />
      </div>
    </>
  );
};

export default App;
