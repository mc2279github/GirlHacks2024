# GirlHacks2024

## Jukebox
Welcome to JukeBox! A safe and efficient way for guests to request songs at a party. Party hosts can acquire a secure pin allowing guests to submit requests to the party's song list. Get rid of duplicates and say goodbye to explicit content. Let's keep this party going!



To run the webserver you will need to plug the private key and cert into the GirlHacks dir,edit src/main.rs and change the addr the server binds to ,and run the code
https://www.rust-lang.org/tools/install
```rust

let acceptor = TlsAcceptor::from(Arc::new(config));
let listner = TcpListener::bind("127.0.0.1:4443").await?;
//                        change this ^^^
// 127.0.0.1:443 when running for yourself on your computer
// 0.0.0.0:443 when running for the public
let service = service_fn(service);


```

```bash
#compile the code
cd GirlHacks2024
cargo run
# it wont run as it doent have privlaiges to bind to port 443
setcap 'cap_net_bind_service=+ep' target/debug/GirlHacks2024
cargo run
#the web server should be running
```
