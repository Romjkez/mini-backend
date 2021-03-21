export interface GetWelcomeTextParams {
  email: string
  password: string
}

export function getWelcomeText(params: GetWelcomeTextParams): string {
  return `
    <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Roboto, -apple-system, sans-serif;">
  <h1>Добро пожаловать в ${process.env.APP_NAME}!</h1>
  <p>
    <span>Ваши данные для входа:</span><br>
    <span>Логин: ${params.email}</span><br>
    <span>Пароль: ${params.password}</span><br>
  </p>
  <div>
    Ссылки для скачивания приложения:<br>
    <a style="color: transparent" href="https://www.apple.com/app-store">
      <img src="https://i.imgur.com/3j2KqKN.png" alt="App Store">
    </a>
    <a style="color: transparent" href="https://play.google.com">
      <img style="margin-top: 5px;" src="https://i.imgur.com/4kUfVBN.png" alt="Google Play">
    </a>
  </div>
  <p>
    Если вы не понимаете, о чём идет речь, проигнорируйте это письмо.
  </p>
  </body>
</html>
  `;
}

export function getPlainWelcomeText(params: GetWelcomeTextParams): string {
  return `Добро пожаловать в ${process.env.APP_NAME}!
  \nВаши данные для входа:\nЛогин: ${params.email}\nПароль: ${params.password}
  \nСсылка для скачивания в App Store: https://www.apple.com/app-store
  \nСсылка для скачивания в Google Play: https://play.google.com
  \nЕсли вы не понимаете, о чём идет речь, проигнорируйте это письмо.`;
}
