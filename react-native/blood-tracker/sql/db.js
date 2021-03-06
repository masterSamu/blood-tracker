import React from 'react';
import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('bloodtracker');

/**@author Markus */
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //By default, primary key is auto_incremented - we do not add anything to that column
        tx.executeSql('create table if not exists donor(id integer not null primary key, bloodType text not null);',
         
            //second parameters of execution:empty brackets - this parameter is not needed when creating table            
            [],
            //If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

/**@author Markus */
export const addBloodType=(bloodType)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into donor(bloodType) values(?);',
            //And the values come here
            [bloodType],
            //If the transaction succeeds, this is called
            (_, result)=>{
                resolve(result);
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

/**@author Markus */
export const fetchAllBloodData=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table donor
            tx.executeSql('select * from donor;',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

/**@author Joni */
export const updateUserBloodType=(bloodType, id)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be updated
            tx.executeSql('UPDATE donor SET bloodtype=? WHERE id=?',
            //And the values come here
            [bloodType, id],
            //If the transaction succeeds, this is called
            (_, result)=>{
                resolve(result);
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};