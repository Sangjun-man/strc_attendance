import { useState, useEffect, useRef, useCallback } from "react";
import Admin from "./Admin";
function Login() {
  const [login, setLogin] = useState();

  const idRef = useRef();
  const passwordRef = useRef();

  const handleLogin = useCallback(() => {
    const idRegex = /admin/;
    const passwordRegex = /strc123/;

    if (!(idRef.current.value && passwordRef.current.value))
      return alert("비밀번호, 아이디 둘다 입력해주세요");

    if (!idRegex.test(idRef.current.value)) return alert("아이디가 다릅니다");
    if (!passwordRegex.test(passwordRef.current.value))
      return alert("비밀번호가 다릅니다");

    return setLogin(true);
  }, []);

  if (!login) {
    return (
      <>
        <input id="id" placeholder="id" ref={idRef} type="text" />
        <input
          id="password"
          placeholder="password"
          ref={passwordRef}
          type="password"
        />
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          로그인
        </button>
      </>
    );
  }

  return <Admin />;
}

export default Login;
