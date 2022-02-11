import React, { useCallback, useEffect, useRef } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image, Button, Input } from "antd";
import storageRef from "./firebase";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ProfileImage = styled(Image)`
  width: 150px;
  height: 150px;

  border-radius: 100%;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 11.5px;
  color: #999;
  margin-top: 10px;
`;

const Profile = () => {
  const navigate = useNavigate();

  const fileInputTag = useRef();

  const fileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);

    const result = await storageRef.child(`uploads/${file.name}`).put(file);
    console.log(result.task.uploadUrl_);
  };

  const fileUploadClick = useCallback(() => {
    fileInputTag.current.click();
  }, [fileInputTag.current]);

  useEffect(() => {
    const loginFlag = loginCheck();

    console.log(loginFlag);

    if (!loginFlag) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <TopNav title="Profile" desc="프로필...." />
      <Wrapper>
        <ProfileImage src="https://thumb.mtstarnews.com/06/2021/07/2021073005413626181_1.jpg" />

        <input type="file" hidden ref={fileInputTag} onChange={fileUpload} />

        <Button type="primary" size="small" onClick={fileUploadClick}>
          이미지 변경
        </Button>

        <Text>상태메세지</Text>

        <Input allowClear={true} />
        <BtnWrapper>
          <Button type="primary" size="small">
            저장
          </Button>
        </BtnWrapper>
      </Wrapper>
    </div>
  );
};

export default Profile;
