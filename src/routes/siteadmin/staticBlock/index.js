import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import StaticBlock from './StaticBlock';
import { getStaticBlockInfo } from '../../../actions/siteadmin/getStaticBlockInfo';
const title = 'Static Info Block';

export default {

  path: '/siteadmin/home/static-info-block',

  async action({ store, dispatch }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    await store.dispatch(getStaticBlockInfo())

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    return {
      title,
      component: <AdminLayout><StaticBlock title={title} /></AdminLayout>,
    };
  },

};
