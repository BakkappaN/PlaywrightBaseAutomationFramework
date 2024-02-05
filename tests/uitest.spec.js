// Include playwright module
const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/homepage');
const { ResultPage } = require('../pages/resultpage');
const { PlaylistPage } = require('../pages/playlistpage');
import { qaTestData } from "../test-data/qa/google.json";
import { stageTestData } from "../test-data/stage/google.json";

let testData = null;

test.beforeAll('Running before all tests', ()=>{
    if(process.env.ENV == 'qa'){
        testData = qaTestData;
    }else{
        testData = stageTestData;
    }
})

// Write a test
test('Ui automation test in playwright', async({page}) =>{
    // Go to URL
    const homepage = new HomePage(page);
    await homepage.goto();
   
    // Search with keywords
    homepage.searchKeywords(testData.skill1);

    // Click on playlist
    const resultpage = new ResultPage(page);
    resultpage.clickOnPlaylist();

    await page.waitForTimeout(4000);

    // Click on video
    const playlistpage = new PlaylistPage(page);
    playlistpage.clickOnVideo();

    await page.waitForTimeout(8000);
})

    