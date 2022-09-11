import chalk from 'chalk';

const AppLog = (
  type:
    | 'Middleware'
    | 'Controller'
    | 'Repository'
    | 'Server'
    | 'Service'
    | 'Error',
  text: string,
) => {
  console.log(chalk.blue(type), chalk.yellow(text));
};

export default AppLog;
