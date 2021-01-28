export const changePage = (page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: page
  };
};

export const signIn = (creds) => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({type: 'CLEAR_ERR'});
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({
          type: 'CHANGE_PAGE',
          payload: 'products'
        });
      })
      .catch((err) => {
        switch(err.code) {
          case "auth/user-not-found":
            dispatch({
              type: 'SHOW_EMAIL_ERROR',
              payload: err.message
            })
            break;
          case "auth/wrong-password":
            dispatch({
              type: 'SHOW_PASSWORD_ERROR',
              payload: err.message
            })
            break;
        }
      });
  };
};

export const signUp = (creds) => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({
          type: 'CHANGE_PAGE',
          payload: 'products'
        });
      })
      .catch((err) => {
        switch(err.code) {
          case "auth/invalid-email":
            dispatch({
              type: 'SHOW_EMAIL_ERROR',
              payload: err.message
            })
            break;
          case "auth/weak-password":
            dispatch({
              type: 'SHOW_PASSWORD_ERROR',
              payload: err.message
            })
            break;
        }
      });
  };
};

export const signInGoogle = () => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        dispatch({
          type: 'CHANGE_PAGE',
          payload: 'products'
        });
      })
  }
}

export const signOut = () => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: 'CHANGE_PAGE',
          payload: 'login'
        })
      })
  }
};

export const addItemToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product
  };
};

export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: id
  };
}

export const clearCart = () => {
  return {
    type: 'CLEAR_CART'
  }
}

export const updateSubtotal = (action, value) => {
  if (action === 'add') {
    return {
      type: 'ADD_ITEM',
      payload: value
    };
  } else if (action === 'remove') {
    return {
      type: 'REMOVE_ITEM',
      payload: value
    };
  }
}

export const filterCategory = (category) => {
  if (category === 'shoes' || category === 'jackets' || category === 'pants') {
    return {
      type: 'CATEGORY_SORT',
      payload: category
    }
  } else {
    return {
      type: 'SHOW_ALL'
    }
  }
}

export const searchTitle = (category, term) => {
  return {
    type: 'SEARCH_TITLE',
    payload: {category, term}
  }
}

