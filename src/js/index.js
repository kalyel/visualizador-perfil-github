import { fetchGitHubUser, fetchGitHubUserRepos } from './modules/githubApi.js';
import { renderProfile, renderLoading, clearProfile } from './modules/profileView.js';

const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;
    if (!userName) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        clearProfile(profileResults);
        return;
    }

    renderLoading(profileResults);

    try {
        const userData = await fetchGitHubUser(userName);
        const userRepos = await fetchGitHubUserRepos(userName);
        console.log(userRepos);
        
        
        if (!userData) {
            alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.');
            clearProfile(profileResults);
            return;
        }

        renderProfile(userData, userRepos, profileResults);

    } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.');
        clearProfile(profileResults);
    }
});
