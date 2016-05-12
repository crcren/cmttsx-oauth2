# cmttsx.oauth2

  为山西铁通代维管理系统开发的oauth子系统，其他子系统可通过此子系统获得认证，实现单点登录;同时支持任何第三方软件调用。

## 安装说明

本软件需安装nodejs和npm（具体安装方法请自行百度），下载该软件请使用：
1、如果安装了git，请使用git clone https://github.com/crcren/cmttsx-oauth2.git 。
2、未安装git，也可以打开https://github.com/crcren/cmttsx-oauth2，点击download zip 下载该模块，并解压。
然后打开终端工具，进入到cmttsx-oauth2目录下，运行 ‘npm install’ 安装所有依赖库（如果是linux，你可能需要在root帐号下进行），然后运行‘npm start’。该服务将被运行在 `http://localhost:3000` 下。

## 使用说明

如果要测试该软件，你需要进入src目录，运行 ‘node seed.js’，添加帐号信息
客户端帐号：如

* **clientId**: `application`
* **secret**: `secret`

用户帐号：如

* **username**: `crcren`
* **password**: `password`

### 使用password方式获取token令牌

获取token需要POST访问`http://localhost:3000/oauth/token`，同时将客户端帐号信息添加到头部，并将用户帐号信息及认证方式添加到body区：

* **Headers**
    * **Authorization**: `"Basic " + clientId:secret base64'd`
        * (比如, 使用 `application:secret`, 需要发送基本认证 `Basic YXBwbGljYXRpb246c2VjcmV0`)

    * **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
    * `grant_type=password&username=pedroetb&password=password`

一切就绪，你将得到类似下面的一个回复信息：

```
{
    "token_type": "bearer",
    "access_token": "72ab415822b56cf0f9f93f07fe978d9aae859325",
    "expires_in": 3600
}
```

### 如何使用token令牌访问资源

现在，你可以使用刚刚获得的token访问该系统提供的资源，比如，你可以 GET 访问 `http://localhost:3000/` ，并将token包含在头部：

* **Headers**
    * **Authorization**: `"Bearer " + access_token`
        * (比如, `Bearer 72ab415822b56cf0f9f93f07fe978d9aae859325`)
