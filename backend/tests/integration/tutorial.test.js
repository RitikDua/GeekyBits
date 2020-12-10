const request = require("supertest");
const mongoose = require("mongoose");
const Tutorial = require("../../models/tutorialModel");

let token = "";
let server;

describe("/tutorials", () => {
  beforeEach(async () => {
    server = require("../../server");
    const res = await request(server).post("/users/login").send({
      email: "user@example.com",
      password: "pikaboo.007",
    });
    token = res.body.data.token;
  });

  afterEach(async () => {
    await server.close();
    // await Tutorial.collection.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all tutorials", async () => {
      const dbTutorials = [
        {
            "tutorialTitle":"Variables and Identifiers",
            "content":"In%20C%2FC%2B%2B%20programs%2C%20the%20most%20fundamental%20element%20is%20expression.%20Expression%20can%20be%20formed%20by%20mixing%20data%20and%20operators.%20Data%20can%20be%20represented%20by%20variables%2C%20constants%20etc.%20whereas%20operators%20are%20defined%20in%20every%20programming%20languages.%20C%2FC%2B%2B%20languages%20supports%20various%20data%20types.%20All%20these%20topics%20are%20explained%20below%3A%20-%0D%0A%0D%0A%0D%0A%0D%0AVariable%3A%20A%20variable%20is%20a%20named%20location%20in%20memory.%20It%20is%20used%20to%20hold%20a%20value%20during%20the%20execution%20of%20program.%20All%20variables%20needs%20to%20be%20declared%20before%20they%20used.%20Every%20variable%20has%20a%20specific%20data%20type%20associated%20with%20it.%20Which%20shows%20the%20type%20of%20data%20it%20can%20hold.%20To%20declare%20a%20variable%2C%20we%20can%20use%20as%20below%3A%0D%0A%0D%0A%0D%0A%0D%0Adata_type%20var_name%3B%0D%0A%0D%0A%0D%0Adata_type%20is%20a%20valid%20data%20type%20and%20modifier%20and%20var_name%20is%20the%20name%20of%20the%20variable%20declared.%0D%0A%0D%0A%0D%0A%0D%0AConstants%3A%20Constants%20refer%20to%20fixed%20values%20that%20the%20program%20may%20not%20alter.%20Constants%20can%20be%20of%20any%20of%20the%20basic%20data%20types.%20The%20way%20each%20constant%20is%20represented%20depends%20upon%20its%20type.%20Constants%20are%20also%20called%20literals.%0D%0A%0D%0ACharacter%20constants%20are%20enclosed%20between%20single%20quotes.%20For%20example%2C%20'a'%20and%20'%25'%20are%20both%20character%20constants.%20Integer%20constants%20are%20specified%20as%20numbers%20without%20fractional%20components.%20For%20example%2C%2010%20and%20%E2%80%93100%20are%20integer%20constants.%20Floating-point%20constants%20require%20the%20decimal%20point%20followed%20by%20the%20number's%20fractional%20component.%20For%20example%2C%2011.123%20is%20a%20floating-point%20constant.%20C%20also%20allows%20you%20to%20use%20scientific%20notation%20for%20floating-point%20numbers.%20For%20example%2C%0D%0A%23%24codes%5B0%5D%23%24%0D%0AWhen%20a%20constant%20value%20starts%20with%200%2C%20it%20is%20considered%20as%20octal%20number.%20So%20if%20we%20use%20as%2C%0D%0A%0D%0Aint%20a%20%3D%20070%3B%0D%0Aand%20then%20want%20to%20print%20the%20value%20of%20a%20in%20decimal%20it%20is%20not%2070%2C%20it%20is%20the%20decimal%20equivalent%20of%2070%20base%208%20which%20is%2056.%20Also%20following%20is%20a%20syntax%20error%2C%0D%0A%0D%0Aint%20a%20%3D%20078%3B%0D%0Aas%20you%20are%20writing%20an%20octal%20constant%2C%20but%20in%20octal%20only%20digits%20from%200%20to%207%20can%20be%20used%2C%20hence%208%20is%20not%20a%20valid%20digit%20in%20octal%20number%20system.%0D%0A%23%24codes%5B1%5D%23%24%0D%0AIdentifiers%3A%20In%20C%2FC%2B%2B%2C%20the%20names%20of%20variables%2C%20functions%2C%20labels%2C%20and%20various%20other%20user-defined%20items%20are%20called%20identifiers.%20The%20length%20of%20these%20identifiers%20can%20vary%20from%20one%20to%20several%20characters.%20The%20first%20character%20must%20be%20a%20letter%20or%20an%20underscore%2C%20and%20subsequent%20characters%20must%20be%20either%20letters%2C%20digits%2C%20or%20underscores.%20Here%20are%20some%20correct%20and%20incorrect%20identifier%20names%3A%0D%0A%0D%0A%0D%0A%0D%0ACorrect%20%3A%20employee_name%2C%20emp_phone%2C%20_empid%2C%20_number123%0D%0A%0D%0AIncorrect%20%3A%201empno%2C%20emp-number%2C%20first%26last%2C%20high..bal%0D%0A%0D%0A%0D%0A%0D%0AIn%20an%20identifier%2C%20upper%20and%20lowercase%20are%20treated%20as%20distinct.%20Hence%20count%2C%20Count%20and%20COUNT%20are%20three%20separate%20identifiers.",
            "codes":["%23include%20%3Cstdio.h%3E%0D%0A%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20char%20c%20%3D%20'A'%3B%20%20%20%20%20%20%20%20%2F%2F%20character%20constant%0D%0A%20%20int%20i%20%3D%2050%3B%20%20%20%20%20%20%20%20%2F%2F%20integer%20constant%0D%0A%20%20double%20%20%20%20df%20%3D%203.5%3B%20%20%20%20%2F%2F%20double%20constant%0D%0A%0D%0A%20%20printf(%22c%20%3D%20%25c%5Cn%22%2C%20c)%3B%0D%0A%20%20printf(%22i%20%3D%20%25d%5Cn%22%2C%20i)%3B%0D%0A%20%20printf(%22df%20%3D%20%25lf%5Cn%22%2C%20df)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D","%23include%20%3Cstdio.h%3E%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20int%20a%20%3D%20070%3B%0D%0A%20%20printf(%22a%20%3D%20%25d%22%2C%20a)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D"]
        },
        {
            "tutorialTitle":"C - Data types",
            "content":"C%20defines%20four%20basic%20primitive%20data%20types%3A%20character%2C%20integer%2C%20floating-point%2C%20valueless.%20These%20are%20declared%20using%20char%2C%20int%2C%20float%2C%20and%20void%20respectively.%20These%20data%20types%20will%20determine%20how%20much%20space%20will%20be%20allocated%20to%20a%20particular%20variable%20in%20memory%20of%20computer%20while%20executing%20a%20program.%20Also%2C%20they%20describe%20how%20to%20interpret%20the%20bits%20of%20a%20variable%2C%20while%20using%20them.%20As%20everything%20in%20memory%20is%20binary%20numbers.%20But%20depending%20on%20data%20type%20specifications%2C%20these%20binary%20numbers%20will%20be%20interpreted%20separately.%0D%0A%0D%0Achar%3A%20These%20variables%20take%201%20byte%20of%20memory.%0D%0A%0D%0Aint%3A%20These%20variables%20depend%20on%20the%20word%20size%20of%20the%20computer.%20So%2C%20generally%2C%20they%20take%2016-bits%20on%20old%2016-bit%20computers%2C%20whereas%20on%20modern%2032-bit%20and%2064-bit%20computers%20they%20consume%2032-bits%20of%20memory.%20you%20cannot%20make%20assumptions%20about%20the%20size%20of%20an%20integer%20if%20you%20want%20your%20programs%20to%20be%20portable%20to%20the%20widest%20range%20of%20environments.%0D%0A%0D%0Afloat%3A%20They%20are%20also%20depend%20on%20implementation.%20Floating%20point%20number%20can%20be%20single-precision%20or%20double-precision.%20Both%20these%20will%20be%20represented%20by%20float%20and%20double%20keywords%20respectively.%0D%0A%0D%0Avoid%3A%20It%20is%20generally%20used%20to%20declare%20a%20function%20returning%20no%20value.%0D%0A%0D%0A%0D%0A%0D%0AWe%20also%20have%20four%20modifiers%20to%20these%20data%20types%3A%20signed%2C%20unsigned%2C%20long%2C%20short.%20Signed%20and%20unsigned%20are%20related%20to%20negative%20numbers%20handling.%20Long%20and%20short%20are%20related%20to%20use%20of%20short%20length%20or%20long%20length%20of%20bits%20for%20a%20variable.%20The%20int%20base%20type%20can%20be%20modified%20by%20signed%2C%20short%2C%20long%2C%20and%20unsigned.%20The%20char%20type%20can%20be%20modified%20by%20unsigned%20and%20signed.%20You%20may%20also%20apply%20long%20to%20double.%0D%0A%0D%0A%0D%0A%0D%0AIf%20a%20variable%20takes%208-bits%20in%20memory%2C%20it%20can%20take%20all%20bits%20from%200000%200000%20to%20all%20bits%201111%201111%2C%20making%20total%20of%20256%20combinations.%20Which%20results%20in%20range%20of%20this%20variable.%20Now%20either%20this%20range%20can%20hold%20half%20negative%20and%20half%20positive%20numbers%20or%20it%20can%20hold%20all%20positive%20numbers.%20So%20an%208-bit%20signed%20variable%20may%20hold%20-128%20to%20127%20values.%20Which%20is%20-2%5E7%20to%202%5E7%20-1%20values.%20So%20in%20general%20if%20a%20variable%20takes%20n-bits%20in%20memory%2C%20then%20its%20signed%20representsation%20will%20take%20-2%5E(n-1)%20to%20%2B2%5E(n-1)-1%20values%2C%20and%20its%20unsigned%20representation%20may%20take%200%20to%202%5E(n)-1%20values.%0D%0A%0D%0A%0D%0A%0D%0ASo%20all%20these%20can%20be%20combined%20and%20we%20can%20declare%20some%20variables%20as%20below%3A%20-%0D%0A%23%24codes%5B0%5D%23%24%0D%0AIn%20C%2C%20there%20is%20a%20rule%20called%20'implicit%20int'.%20Which%20says%2C%20in%20most%20cases%20if%20something%20is%20missing%20in%20statement%2C%20the%20C%20compiler%20presumes%20an%20int%20there.%20Although%20it%20is%20not%20a%20good%20practice%20to%20believe%20on%20it.%20We%20need%20to%20explicitly%20specify%20everything.%20Following%20are%20some%20equivalent%20declarations%3A%20-%0D%0A%0D%0Asigned%20%20%20%20%20%3D%20signed%20int%0D%0Aunsigned%20%20%20%3D%20unsigned%20int%0D%0Along%20%20%20%20%20%20%20%3D%20long%20int%0D%0Ashort%20%20%20%20%20%20%3D%20short%20int%0D%0A%0D%0A%0D%0AType%20Qualifiers%3A%20In%20C%2C%20we%20have%20two%20type%20qualifiers%2C%20which%20can%20allows%20us%20to%20control%20the%20variables%3A%20const%20and%20volatile.%0D%0A%0D%0AVariables%20of%20type%20const%20may%20not%20be%20changed%20by%20program.%20They%20may%20be%20assigned%20an%20initial%20value%20only%20during%20declaration.%20For%20example%2C%0D%0A%0D%0A%0D%0A%0D%0Aconst%20int%20i%3D10%3B%20%20%20%20%20%20%2F%2F%20I%20is%20an%20constant%20integer.%0D%0Ai%20%3D%2020%3B%20%20%20%20%20%20%20%20%20%2F%2F%20It%20will%20be%20a%20error.%0D%0A%0D%0A%0D%0Avolatile%20tells%20the%20compiler%20that%20the%20value%20of%20a%20variable%20may%20change%20outside%20of%20the%20program%20also%2C%20due%20to%20some%20external%20activity.%0D%0A%0D%0A%0D%0A%EF%BB%BF",
            "codes":["%23include%20%3Cstdio.h%3E%0D%0A%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20char%20c%3B%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20c%20is%20a%20character%20variable%20of%208%20bits.%20May%20hold%20value%20from%20-128%20to%20127.%0D%0A%20%20signed%20char%20c1%3B%20%20%20%20%20%20%20%20%20%2F%2F%20c%20is%20a%20character%20variable%20of%208%20bits.%20May%20hold%20value%20from%20-128%20to%20127.%0D%0A%20%20unsigned%20char%20c2%3B%20%20%20%20%2F%2F%20c%20is%20a%20character%20variable%20of%208%20bits.%20May%20hold%20value%20from%200%20to%20255.%0D%0A%20%20int%20i%3B%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20i%20is%20a%20integer%20variable%20of%2016%2F32%20bits.%20%0D%0A%20%20short%20int%20j%3B%20%20%20%20%20%20%20%20%2F%2F%20i%20will%20be%20short%20integer%20of%2016-bits.%20%0D%0A%20%20long%20int%20li%3B%20%20%20%20%20%20%20%20%2F%2F%20li%20is%20a%20long%20int%20variable%2C%20taking%2032-bits.%0D%0A%20%20float%20f%3B%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20f%20is%20single-precision%20floating%20number%20taking%2032-bits%0D%0A%20%20double%20%20%20%20df%3B%20%20%20%20%20%20%20%20%2F%2F%20df%20is%20double-precision%20floating%20number%20taking%2064-bits%0D%0A%20%20long%20double%20ldf%3B%20%20%20%20%2F%2F%20ldf%20is%20double-precision%20floating%20number%20taking%2080-bits%20(Largest%20in%20size).%0D%0A%0D%0A%20%20printf(%22i%20%3D%20%25d%5Cn%22%2C%20i)%3B%0D%0A%20%20%0D%0A%20%20return%200%3B%0D%0A%7D"]
        }
      ];

      await Tutorial.collection.insertMany(dbTutorials);

      const res = await request(server)
        .get("/tutorials")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.tutorials).toHaveProperty("tutorialTitle", dbTutorials.tutorialTitle);
      expect(res.body.data.tutorials.some(t => t.tutorialTitle === "Variables and Identifiers")).toBeTruthy();
      expect(res.body.data.tutorials.some(t => t.tutorialTitle === "C - Data types")).toBeTruthy();  
    });
  });

  describe("GET /:id", () => {
    it("should return tutorial if valid id is passed", async () => {
      const prblm = new Tutorial({
        "tutorialTitle":"Variables and Identifiers",
        "content":"In%20C%2FC%2B%2B%20programs%2C%20the%20most%20fundamental%20element%20is%20expression.%20Expression%20can%20be%20formed%20by%20mixing%20data%20and%20operators.%20Data%20can%20be%20represented%20by%20variables%2C%20constants%20etc.%20whereas%20operators%20are%20defined%20in%20every%20programming%20languages.%20C%2FC%2B%2B%20languages%20supports%20various%20data%20types.%20All%20these%20topics%20are%20explained%20below%3A%20-%0D%0A%0D%0A%0D%0A%0D%0AVariable%3A%20A%20variable%20is%20a%20named%20location%20in%20memory.%20It%20is%20used%20to%20hold%20a%20value%20during%20the%20execution%20of%20program.%20All%20variables%20needs%20to%20be%20declared%20before%20they%20used.%20Every%20variable%20has%20a%20specific%20data%20type%20associated%20with%20it.%20Which%20shows%20the%20type%20of%20data%20it%20can%20hold.%20To%20declare%20a%20variable%2C%20we%20can%20use%20as%20below%3A%0D%0A%0D%0A%0D%0A%0D%0Adata_type%20var_name%3B%0D%0A%0D%0A%0D%0Adata_type%20is%20a%20valid%20data%20type%20and%20modifier%20and%20var_name%20is%20the%20name%20of%20the%20variable%20declared.%0D%0A%0D%0A%0D%0A%0D%0AConstants%3A%20Constants%20refer%20to%20fixed%20values%20that%20the%20program%20may%20not%20alter.%20Constants%20can%20be%20of%20any%20of%20the%20basic%20data%20types.%20The%20way%20each%20constant%20is%20represented%20depends%20upon%20its%20type.%20Constants%20are%20also%20called%20literals.%0D%0A%0D%0ACharacter%20constants%20are%20enclosed%20between%20single%20quotes.%20For%20example%2C%20'a'%20and%20'%25'%20are%20both%20character%20constants.%20Integer%20constants%20are%20specified%20as%20numbers%20without%20fractional%20components.%20For%20example%2C%2010%20and%20%E2%80%93100%20are%20integer%20constants.%20Floating-point%20constants%20require%20the%20decimal%20point%20followed%20by%20the%20number's%20fractional%20component.%20For%20example%2C%2011.123%20is%20a%20floating-point%20constant.%20C%20also%20allows%20you%20to%20use%20scientific%20notation%20for%20floating-point%20numbers.%20For%20example%2C%0D%0A%23%24codes%5B0%5D%23%24%0D%0AWhen%20a%20constant%20value%20starts%20with%200%2C%20it%20is%20considered%20as%20octal%20number.%20So%20if%20we%20use%20as%2C%0D%0A%0D%0Aint%20a%20%3D%20070%3B%0D%0Aand%20then%20want%20to%20print%20the%20value%20of%20a%20in%20decimal%20it%20is%20not%2070%2C%20it%20is%20the%20decimal%20equivalent%20of%2070%20base%208%20which%20is%2056.%20Also%20following%20is%20a%20syntax%20error%2C%0D%0A%0D%0Aint%20a%20%3D%20078%3B%0D%0Aas%20you%20are%20writing%20an%20octal%20constant%2C%20but%20in%20octal%20only%20digits%20from%200%20to%207%20can%20be%20used%2C%20hence%208%20is%20not%20a%20valid%20digit%20in%20octal%20number%20system.%0D%0A%23%24codes%5B1%5D%23%24%0D%0AIdentifiers%3A%20In%20C%2FC%2B%2B%2C%20the%20names%20of%20variables%2C%20functions%2C%20labels%2C%20and%20various%20other%20user-defined%20items%20are%20called%20identifiers.%20The%20length%20of%20these%20identifiers%20can%20vary%20from%20one%20to%20several%20characters.%20The%20first%20character%20must%20be%20a%20letter%20or%20an%20underscore%2C%20and%20subsequent%20characters%20must%20be%20either%20letters%2C%20digits%2C%20or%20underscores.%20Here%20are%20some%20correct%20and%20incorrect%20identifier%20names%3A%0D%0A%0D%0A%0D%0A%0D%0ACorrect%20%3A%20employee_name%2C%20emp_phone%2C%20_empid%2C%20_number123%0D%0A%0D%0AIncorrect%20%3A%201empno%2C%20emp-number%2C%20first%26last%2C%20high..bal%0D%0A%0D%0A%0D%0A%0D%0AIn%20an%20identifier%2C%20upper%20and%20lowercase%20are%20treated%20as%20distinct.%20Hence%20count%2C%20Count%20and%20COUNT%20are%20three%20separate%20identifiers.",
        "codes":["%23include%20%3Cstdio.h%3E%0D%0A%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20char%20c%20%3D%20'A'%3B%20%20%20%20%20%20%20%20%2F%2F%20character%20constant%0D%0A%20%20int%20i%20%3D%2050%3B%20%20%20%20%20%20%20%20%2F%2F%20integer%20constant%0D%0A%20%20double%20%20%20%20df%20%3D%203.5%3B%20%20%20%20%2F%2F%20double%20constant%0D%0A%0D%0A%20%20printf(%22c%20%3D%20%25c%5Cn%22%2C%20c)%3B%0D%0A%20%20printf(%22i%20%3D%20%25d%5Cn%22%2C%20i)%3B%0D%0A%20%20printf(%22df%20%3D%20%25lf%5Cn%22%2C%20df)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D","%23include%20%3Cstdio.h%3E%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20int%20a%20%3D%20070%3B%0D%0A%20%20printf(%22a%20%3D%20%25d%22%2C%20a)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D"]
    });

      await prblm.save();
      
      const res = await request(server)
        .get("/tutorials/" + prblm._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.tutorial).toHaveProperty("tutorialTitle", prblm.tutorialTitle);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/tutorials/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(400);
    });

    it("should return 404 if no tutorial with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/tutorials/" + id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define
    let tut={};

    const exec = async () => {
      return await request(server)
        .post("/tutorials")
        .set("authorization", "Bearer " + token)
        .send(tut);
    };

    beforeEach(() => {
      tut = {
        "tutorialTitle":"Variables and Identifiers",
        "content":"In%20C%2FC%2B%2B%20programs%2C%20the%20most%20fundamental%20element%20is%20expression.%20Expression%20can%20be%20formed%20by%20mixing%20data%20and%20operators.%20Data%20can%20be%20represented%20by%20variables%2C%20constants%20etc.%20whereas%20operators%20are%20defined%20in%20every%20programming%20languages.%20C%2FC%2B%2B%20languages%20supports%20various%20data%20types.%20All%20these%20topics%20are%20explained%20below%3A%20-%0D%0A%0D%0A%0D%0A%0D%0AVariable%3A%20A%20variable%20is%20a%20named%20location%20in%20memory.%20It%20is%20used%20to%20hold%20a%20value%20during%20the%20execution%20of%20program.%20All%20variables%20needs%20to%20be%20declared%20before%20they%20used.%20Every%20variable%20has%20a%20specific%20data%20type%20associated%20with%20it.%20Which%20shows%20the%20type%20of%20data%20it%20can%20hold.%20To%20declare%20a%20variable%2C%20we%20can%20use%20as%20below%3A%0D%0A%0D%0A%0D%0A%0D%0Adata_type%20var_name%3B%0D%0A%0D%0A%0D%0Adata_type%20is%20a%20valid%20data%20type%20and%20modifier%20and%20var_name%20is%20the%20name%20of%20the%20variable%20declared.%0D%0A%0D%0A%0D%0A%0D%0AConstants%3A%20Constants%20refer%20to%20fixed%20values%20that%20the%20program%20may%20not%20alter.%20Constants%20can%20be%20of%20any%20of%20the%20basic%20data%20types.%20The%20way%20each%20constant%20is%20represented%20depends%20upon%20its%20type.%20Constants%20are%20also%20called%20literals.%0D%0A%0D%0ACharacter%20constants%20are%20enclosed%20between%20single%20quotes.%20For%20example%2C%20'a'%20and%20'%25'%20are%20both%20character%20constants.%20Integer%20constants%20are%20specified%20as%20numbers%20without%20fractional%20components.%20For%20example%2C%2010%20and%20%E2%80%93100%20are%20integer%20constants.%20Floating-point%20constants%20require%20the%20decimal%20point%20followed%20by%20the%20number's%20fractional%20component.%20For%20example%2C%2011.123%20is%20a%20floating-point%20constant.%20C%20also%20allows%20you%20to%20use%20scientific%20notation%20for%20floating-point%20numbers.%20For%20example%2C%0D%0A%23%24codes%5B0%5D%23%24%0D%0AWhen%20a%20constant%20value%20starts%20with%200%2C%20it%20is%20considered%20as%20octal%20number.%20So%20if%20we%20use%20as%2C%0D%0A%0D%0Aint%20a%20%3D%20070%3B%0D%0Aand%20then%20want%20to%20print%20the%20value%20of%20a%20in%20decimal%20it%20is%20not%2070%2C%20it%20is%20the%20decimal%20equivalent%20of%2070%20base%208%20which%20is%2056.%20Also%20following%20is%20a%20syntax%20error%2C%0D%0A%0D%0Aint%20a%20%3D%20078%3B%0D%0Aas%20you%20are%20writing%20an%20octal%20constant%2C%20but%20in%20octal%20only%20digits%20from%200%20to%207%20can%20be%20used%2C%20hence%208%20is%20not%20a%20valid%20digit%20in%20octal%20number%20system.%0D%0A%23%24codes%5B1%5D%23%24%0D%0AIdentifiers%3A%20In%20C%2FC%2B%2B%2C%20the%20names%20of%20variables%2C%20functions%2C%20labels%2C%20and%20various%20other%20user-defined%20items%20are%20called%20identifiers.%20The%20length%20of%20these%20identifiers%20can%20vary%20from%20one%20to%20several%20characters.%20The%20first%20character%20must%20be%20a%20letter%20or%20an%20underscore%2C%20and%20subsequent%20characters%20must%20be%20either%20letters%2C%20digits%2C%20or%20underscores.%20Here%20are%20some%20correct%20and%20incorrect%20identifier%20names%3A%0D%0A%0D%0A%0D%0A%0D%0ACorrect%20%3A%20employee_name%2C%20emp_phone%2C%20_empid%2C%20_number123%0D%0A%0D%0AIncorrect%20%3A%201empno%2C%20emp-number%2C%20first%26last%2C%20high..bal%0D%0A%0D%0A%0D%0A%0D%0AIn%20an%20identifier%2C%20upper%20and%20lowercase%20are%20treated%20as%20distinct.%20Hence%20count%2C%20Count%20and%20COUNT%20are%20three%20separate%20identifiers.",
        "codes":["%23include%20%3Cstdio.h%3E%0D%0A%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20char%20c%20%3D%20'A'%3B%20%20%20%20%20%20%20%20%2F%2F%20character%20constant%0D%0A%20%20int%20i%20%3D%2050%3B%20%20%20%20%20%20%20%20%2F%2F%20integer%20constant%0D%0A%20%20double%20%20%20%20df%20%3D%203.5%3B%20%20%20%20%2F%2F%20double%20constant%0D%0A%0D%0A%20%20printf(%22c%20%3D%20%25c%5Cn%22%2C%20c)%3B%0D%0A%20%20printf(%22i%20%3D%20%25d%5Cn%22%2C%20i)%3B%0D%0A%20%20printf(%22df%20%3D%20%25lf%5Cn%22%2C%20df)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D","%23include%20%3Cstdio.h%3E%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20int%20a%20%3D%20070%3B%0D%0A%20%20printf(%22a%20%3D%20%25d%22%2C%20a)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D"]
    };
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 201 and save the mcq if it is valid", async () => {
      const res=await exec();

      const foo = await Tutorial.find({
        tut: {
            "tutorialTitle":"Variables and Identifiers",
            "content":"In%20C%2FC%2B%2B%20programs%2C%20the%20most%20fundamental%20element%20is%20expression.%20Expression%20can%20be%20formed%20by%20mixing%20data%20and%20operators.%20Data%20can%20be%20represented%20by%20variables%2C%20constants%20etc.%20whereas%20operators%20are%20defined%20in%20every%20programming%20languages.%20C%2FC%2B%2B%20languages%20supports%20various%20data%20types.%20All%20these%20topics%20are%20explained%20below%3A%20-%0D%0A%0D%0A%0D%0A%0D%0AVariable%3A%20A%20variable%20is%20a%20named%20location%20in%20memory.%20It%20is%20used%20to%20hold%20a%20value%20during%20the%20execution%20of%20program.%20All%20variables%20needs%20to%20be%20declared%20before%20they%20used.%20Every%20variable%20has%20a%20specific%20data%20type%20associated%20with%20it.%20Which%20shows%20the%20type%20of%20data%20it%20can%20hold.%20To%20declare%20a%20variable%2C%20we%20can%20use%20as%20below%3A%0D%0A%0D%0A%0D%0A%0D%0Adata_type%20var_name%3B%0D%0A%0D%0A%0D%0Adata_type%20is%20a%20valid%20data%20type%20and%20modifier%20and%20var_name%20is%20the%20name%20of%20the%20variable%20declared.%0D%0A%0D%0A%0D%0A%0D%0AConstants%3A%20Constants%20refer%20to%20fixed%20values%20that%20the%20program%20may%20not%20alter.%20Constants%20can%20be%20of%20any%20of%20the%20basic%20data%20types.%20The%20way%20each%20constant%20is%20represented%20depends%20upon%20its%20type.%20Constants%20are%20also%20called%20literals.%0D%0A%0D%0ACharacter%20constants%20are%20enclosed%20between%20single%20quotes.%20For%20example%2C%20'a'%20and%20'%25'%20are%20both%20character%20constants.%20Integer%20constants%20are%20specified%20as%20numbers%20without%20fractional%20components.%20For%20example%2C%2010%20and%20%E2%80%93100%20are%20integer%20constants.%20Floating-point%20constants%20require%20the%20decimal%20point%20followed%20by%20the%20number's%20fractional%20component.%20For%20example%2C%2011.123%20is%20a%20floating-point%20constant.%20C%20also%20allows%20you%20to%20use%20scientific%20notation%20for%20floating-point%20numbers.%20For%20example%2C%0D%0A%23%24codes%5B0%5D%23%24%0D%0AWhen%20a%20constant%20value%20starts%20with%200%2C%20it%20is%20considered%20as%20octal%20number.%20So%20if%20we%20use%20as%2C%0D%0A%0D%0Aint%20a%20%3D%20070%3B%0D%0Aand%20then%20want%20to%20print%20the%20value%20of%20a%20in%20decimal%20it%20is%20not%2070%2C%20it%20is%20the%20decimal%20equivalent%20of%2070%20base%208%20which%20is%2056.%20Also%20following%20is%20a%20syntax%20error%2C%0D%0A%0D%0Aint%20a%20%3D%20078%3B%0D%0Aas%20you%20are%20writing%20an%20octal%20constant%2C%20but%20in%20octal%20only%20digits%20from%200%20to%207%20can%20be%20used%2C%20hence%208%20is%20not%20a%20valid%20digit%20in%20octal%20number%20system.%0D%0A%23%24codes%5B1%5D%23%24%0D%0AIdentifiers%3A%20In%20C%2FC%2B%2B%2C%20the%20names%20of%20variables%2C%20functions%2C%20labels%2C%20and%20various%20other%20user-defined%20items%20are%20called%20identifiers.%20The%20length%20of%20these%20identifiers%20can%20vary%20from%20one%20to%20several%20characters.%20The%20first%20character%20must%20be%20a%20letter%20or%20an%20underscore%2C%20and%20subsequent%20characters%20must%20be%20either%20letters%2C%20digits%2C%20or%20underscores.%20Here%20are%20some%20correct%20and%20incorrect%20identifier%20names%3A%0D%0A%0D%0A%0D%0A%0D%0ACorrect%20%3A%20employee_name%2C%20emp_phone%2C%20_empid%2C%20_number123%0D%0A%0D%0AIncorrect%20%3A%201empno%2C%20emp-number%2C%20first%26last%2C%20high..bal%0D%0A%0D%0A%0D%0A%0D%0AIn%20an%20identifier%2C%20upper%20and%20lowercase%20are%20treated%20as%20distinct.%20Hence%20count%2C%20Count%20and%20COUNT%20are%20three%20separate%20identifiers.",
            "codes":["%23include%20%3Cstdio.h%3E%0D%0A%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20char%20c%20%3D%20'A'%3B%20%20%20%20%20%20%20%20%2F%2F%20character%20constant%0D%0A%20%20int%20i%20%3D%2050%3B%20%20%20%20%20%20%20%20%2F%2F%20integer%20constant%0D%0A%20%20double%20%20%20%20df%20%3D%203.5%3B%20%20%20%20%2F%2F%20double%20constant%0D%0A%0D%0A%20%20printf(%22c%20%3D%20%25c%5Cn%22%2C%20c)%3B%0D%0A%20%20printf(%22i%20%3D%20%25d%5Cn%22%2C%20i)%3B%0D%0A%20%20printf(%22df%20%3D%20%25lf%5Cn%22%2C%20df)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D","%23include%20%3Cstdio.h%3E%0D%0Aint%20main()%0D%0A%7B%0D%0A%20%20int%20a%20%3D%20070%3B%0D%0A%20%20printf(%22a%20%3D%20%25d%22%2C%20a)%3B%0D%0A%0D%0A%20%20return%200%3B%0D%0A%7D"]
        },
      });

      expect(foo).not.toBeNull();
      expect(res.status).toBe(201);
    });

    it("should return 400 if tutorial details are not valid", async () => {
      tut = {
        ola:"pqrs"
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return the tutorial if it is valid', async() => { 
      const res = await exec();

      expect(res.body.data.tutorial).toHaveProperty('_id');
      expect(res.body.data.tutorial).toHaveProperty("tutorialTitle","Variables and Identifiers");      
    });
  });
});
