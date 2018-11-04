import { getUsefulContents } from "./game/index";

getUsefulContents("http://www.example.com", data => {
    doSomethingUseful(data);
});
