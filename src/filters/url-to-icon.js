const urlToIcon = url => {
  const urlArr = url.split('/').filter(item => !!item);

  if (!urlArr.length) {
    urlArr.push('home');
  }
  return `icon-${urlArr.join('-')}`;
};

export default urlToIcon;
