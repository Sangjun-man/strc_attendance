import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { attendanceInfoAtom, attendanceListAtom } from "../state/attendance";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001/strc");

function Attendance() {
  const [info, setInfo] = useRecoilState(attendanceInfoAtom);
  const [attendanceList, setAttendanceList] =
    useRecoilState(attendanceListAtom);
  const [status, setStatus] = useState({ start: false, end: false, user: "" });

  const userNameRef = useRef();

  const onSend = () => {
    socket.emit(
      "attend",
      JSON.stringify({
        user: userNameRef.current.value,
      })
    );
  };

  useEffect(() => {
    socket.on("connect", (msg) => {});

    socket.on("disconnect", () => {});

    socket.on("startAttendance", (msg) => {
      console.log(msg);
      const { startTime, title } = JSON.parse(msg);
      setInfo({ startTime, title });
      setStatus((prev) => ({ ...prev, start: true, end: false }));
    });

    socket.on("complete", (msg) => {
      const { user } = JSON.parse(msg);

      setStatus((prev) => ({ ...prev, end: true, user: user }));
    });

    socket.on("attendanceList", (msg) => {
      const { attendanceList } = JSON.parse(msg);
      console.log(msg, attendanceList);
      setAttendanceList(attendanceList);
    });

    socket.on("end", () => {
      setStatus((prev) => ({ ...prev, end: true }));
    });

    socket.emit("hello", "hhellllo");
  }, []);

  if (!status.start) return <div>loading</div>;

  return (
    <div>
      {status.end ? (
        <>
          <div>출석끝</div>
          <div>{status.user} </div>
        </>
      ) : (
        <>
          <div>{info.title}</div>
          <div>{info.startTime}</div>
          <input ref={userNameRef} />
          <button
            onClick={() => {
              onSend();
            }}
          ></button>
          <div>
            {attendanceList.map((people) => (
              <span>{people}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Attendance;
