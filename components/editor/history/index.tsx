'use client';
import Spacer from '@/components/root/Spacer';
import { Fragment } from 'react';
import DocumentList from './List';
import Search from './Search';

const DocHistory = () => {
  return (
    <Fragment>
      <Search />
      <Spacer y='48' />
      <DocumentList />
    </Fragment>
  );
};
export default DocHistory;
