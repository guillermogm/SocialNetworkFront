import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CNavigator = ({
    content = "Home",
    path = "/",
    ...props
  }) => {
    const navigate = useNavigate();
    return (
      <div {...props} onClick={() => navigate(path)}>
        {content}
      </div>
    );
  };