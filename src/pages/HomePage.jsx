import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';
import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncAddTalk, asyncToogleLikeTalk } from '../states/talks/action';

function HomePage() {
  const talks = useSelector((state) => state.talks);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  const onAddTalk = (text) => {
    dispatch(asyncAddTalk({ text }));
  };

  const onLike = (id) => {
    dispatch(asyncToogleLikeTalk(id));
  };

  const talkList = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.user),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}

export default HomePage;
