import { FunctionComponent } from "react";
import { IDocumentationPageProps } from "../lib/content.interfaces";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Link from "next/link";
import Image from "next/image";

export interface IBucketContentProps {
    childPages?: {
        [key: string]: IDocumentationPageProps;
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        h2: {
            borderTop: '1px black solid',
            marginTop: '50px !important',
            paddingTop: theme.spacing(2)
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
        },
        divRoot: {
            padding: 16,
            [theme.breakpoints.up("sm")]: {
                width: "50% !important",
            },
            [theme.breakpoints.up("lg")]: {
                width: "33% !important",
            },
            [theme.breakpoints.up("xl")]: {
                width: "25% !important",
            },
        },
        root: {
            display: "flex",
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        content: {
            flex: "1 0 auto",
        },
        imageContainer: {
            minHeight: "100%",
            cursor: "pointer",
            display: "inline-block",
            overflow: "hidden",
            position: "relative",
            minWidth: "150px !important",
            "& img": {
                pointerEvents: "none",
                position: "absolute",
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover",
            },
        },
    }),
);

export const BucketContent: FunctionComponent<IBucketContentProps> = ({ childPages }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.h2} component="h2" variant="h2">
                Coming next:
            </Typography>
            <div className={classes.container}>
                {childPages &&
                    Object.keys(childPages).map((child) => {
                        const childData = childPages[child].metadata;
                        const title = (childData.title || child).replace(/_/g, " ");
                        const link = "/" + childPages[child].id.join("/");
                        return (
                            <Link key={link} href={link}>
                                <div className={classes.divRoot}>
                                    <Card className={classes.root}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography component="h5" variant="h5">
                                                    {title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {childData.description}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className={classes.imageContainer}>{childData.imageUrl && <Image src={childData.imageUrl} unsized={true}></Image>}</div>
                                    </Card>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </>
    );
};
