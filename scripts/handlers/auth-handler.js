import {getPartials, setHeaderInfo} from '../shared.js';
import {get,post,put, del} from '../requester.js';
export function getRegister(ctx){
    setHeaderInfo(ctx);
    this.loadPartials(getPartials())
    .partial('./views/auth/register.hbs')
};

export function postRegister(ctx){
    const{ username, password, rePassword} = ctx.params;

    if(username && password && password == rePassword)
    {
        post('user', '', {username, password}, 'Basic')
        .then((userInfo) => {
            console.log(ctx);
            console.log(userInfo);
            saveAuthInfo(userInfo);
            ctx.redirect('/');
        })
        .catch(console.error);
    }
};

export function getLogin(ctx){
    setHeaderInfo(ctx);
    this.loadPartials(getPartials())
    .partial('./views/auth/login.hbs');
};

export function postLogin(ctx){
    const {username, password} = ctx.params;

    if(username && password) {
        post ('user','login', {username, password}, 'Basic')
        .then((userInfo) => {
            ctx.isAuth = sessionStorage.getItem('username');
            saveAuthInfo(userInfo);
            ctx.redirect('/');
        });
    }
};

export function logout(ctx){
    post('user', '_logout',{},"Kinvey")
    .then(()=> {
        sessionStorage.clear();
        ctx.redirect('/');
    })
    .catch(console.error);
};
function saveAuthInfo(userInfo){
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
};