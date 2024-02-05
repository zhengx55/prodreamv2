'use client';
import Spacer from '@/components/root/Spacer';
import { Fragment, useState } from 'react';
import DocumentList from './List';
import Search from './Search';

const DocHistory = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <Fragment>
      <Search setKeyword={setKeyword} />
      <Spacer y='48' />
      <DocumentList searchTerm={keyword} />
    </Fragment>
  );
};
export default DocHistory;
