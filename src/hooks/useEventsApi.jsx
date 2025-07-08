import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useEventsApi = () => {
    const axiosSecure= useAxiosSecure();

    const joinedEventsApi= email => {
        return axiosSecure.get(`/events/joined?email=${email}`)
        .then(res => {res.data});
    }
    return {
        joinedEventsApi,
    };
};

export default useEventsApi;