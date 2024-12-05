import App from "@app/app";
import { ApplicationOptions } from "@config/ApplicationConfig";
export default function bootstrap() {
    const applicationOptions: ApplicationOptions = {
        morganConfig: {
            format: "combined",
            logFileLocation: "./access.log",
        },
    };
    return new App(applicationOptions);
}
bootstrap();
