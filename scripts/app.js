import * as requester from './requester.js';
import * as shared from './shared.js';
import * as authHandler from './handlers/auth-handler.js';

const app = Sammy('body', function()
{
    this.use('Handlebars','hbs');

    this.get('/', function(ctx)
    {
        shared.setHeaderInfo(ctx);
        const partials = shared.getPartials();
        if(ctx.isAuth)
        {
            get('appdata', 'treks', 'Kinvey')
            .then((treks)=> {
                ctx.treks = treks;

                this.loadPartials(partials)
                .partial('./views/home.hbs');
            });
        }
        else
        {
            this.loadPartials(partials)
            .partial('./views/home.hbs');
        }
    });
    this.get('/register',authHandler.getRegister);
    this.post('/register', authHandler.postRegister);
    this.get('/login', authHandler.getLogin);
    this.post('/login',authHandler.postLogin);
    this.post('/logout', authHandler.logout);
    
});
app.run();