import { getUsefulContents } from "./file";

getUsefulContents("http://www.grishy.com", data => {
    doSomethingUseful(data);
    console.log(data);
});
