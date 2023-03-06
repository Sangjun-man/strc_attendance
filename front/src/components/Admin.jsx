import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001/strc");

function Admin() {
  const titleRef = useRef();
  const [status, setStatus] = useState({ isStart: false, title: "" });
  const [attendanceList, setAttendanceList] = useState([]);

  const handleAttendance = () => {
    if (!titleRef.current.value) return alert("출석 제목 입력해주세요");
    console.log("initAttendance");
    socket.emit(
      "initAttendance",
      JSON.stringify({
        title: titleRef.current.value,
        startTime: new Date(),
      })
    );
  };

  useEffect(() => {
    socket.on("startAttendance", (msg) => {
      console.log("startAttendance", msg);
      setStatus({ isStart: true, title: msg });
    });
    socket.on("attendanceList", (msg) => {
      console.log(msg);
      const { attendanceList } = JSON.parse(msg);
      console.log(attendanceList);
      setAttendanceList((prev) => [...prev, ...attendanceList]);
    });
  }, []);

  return (
    <div>
      {status.isStart ? (
        <>
          <div>{status.title}</div>
          <button>출석 종료</button>
        </>
      ) : (
        <>
          <div>출석 이름</div>
          <input
            ref={titleRef}
            id="title"
            type="text"
            placeholder="출석 제목 입력"
          ></input>
          <button
            onClick={() => {
              console.log("123123123");
              handleAttendance();
            }}
          >
            출석 시작d
          </button>
        </>
      )}
      {attendanceList.map((people) => (
        <div key={people}>{people}</div>
      ))}
    </div>
  );
}

export default Admin;
